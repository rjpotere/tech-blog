const addpost = async (ev) => {
ev.preventDefault();


const postTitle = document.getElementById('postTitle').value;
const postInput = document.getElementById('postInput').value;

console.log(postTitle, postInput)

const response = await fetch('api/posts/createPost', {
    method: 'POST',
    body: JSON.stringify({
        post_title: postTitle,
        post_body: postInput,
    }),
    headers: {'Content-Type': 'application/json'},
});

if (response.ok) {
    document.location.replace('/profile')
} else {alert('Error saving post!')}

}

//grabs sibbling then pass to modal

const deletePost = async (ev) => {
    ev.preventDefault();

    const postId = ev.target.getAttribute("data-userId");;
    
    const response = await fetch('api/posts/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            id: postId
        }),
        headers: {'Content-Type': 'application/json'},
    });
    
    if (response.ok) {
        document.location.replace('/profile')
    } else {alert('Error deleting post!')}
    
    }

document.getElementById('post-form').addEventListener('submit', addpost);
document.getElementById('deleteBtn').addEventListener('click', deletePost);