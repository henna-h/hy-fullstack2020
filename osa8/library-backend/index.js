require('dotenv').config()
const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { v1: uuidv1 } = require('uuid')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.SECRET


console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(!args.author && !args.genre){
        const all =  await Book.find({}).populate('author')
        return all
      }
      
      if(!args.author){
        const byGenre =  await Book.find({genres: args.genre}).populate('author')
        return byGenre
      }

      const author =  await Author.findOne({name: args.author})
      if(!args.genre){
      
        const byAuthor = await Book.find({author: author._id}).populate('author')
        return byAuthor
      }

      const bothFilters = await Book.find({author: author._id, genres: args.genre}).populate('author')

      return bothFilters
    
    },
    allAuthors: async (root) => { 
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (args) => {
      const author = await Author.findOne({name: args.name})

      const bookCount = await Book.find({author: author.id}).length
      return bookCount
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      if(!context.currentUser){
        throw new AuthenticationError("No authentication")
      }

      let author = await Author.findOne({ name: args.author});

      if(!author){
        author = new Author({ "name": args.author, "id": uuidv1() })
        console.log("AUTHOR: " + author)

        try {
          const newAuthor = await author.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } 

      const book = new Book({ title: args.title, published: args.published, genres: args.genres, author: author, id: uuidv1()})

      try {
        const newBook = await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },

    editAuthor: async (root, args, context) => {

      if(!context.currentUser){
        throw new AuthenticationError("No authentication")
      }

      const author = await Author.findOne({ name: args.name})

      if(!author){
        return null
      }
      author.born = args.setBornTo

      try{
        await author.save()
      } catch (error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'salasana' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})