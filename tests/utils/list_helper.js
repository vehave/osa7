const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    console.log(likes)
    const reducer = (sum, item) => {
        return sum + item
    }

    return likes.reduce(reducer,0)    
}
    

  
module.exports = {
    dummy,
    totalLikes
}