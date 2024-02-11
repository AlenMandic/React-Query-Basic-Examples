async function getIndividualPost(id:string | undefined) {

    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const result = await response.json()
    return result

}

export { getIndividualPost }