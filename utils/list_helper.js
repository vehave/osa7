const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })

  return sum
}

const favoriteBlog = (blogs) => {
  let eniten = 0
  let favorite = {}
  blogs.map(blog =>{
    if (blog.likes >= eniten){
      favorite = blog
      eniten = blog.likes
    }

  })

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}