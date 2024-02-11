async function getAllPosts() {

    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()

}

export { getAllPosts }
