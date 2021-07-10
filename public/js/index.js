let updateTitle = document.querySelector('.updatePostTitle');
let updateBody = document.querySelector('.updatePostBody');



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
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/profile')
    } else { alert('Error saving post!') }

}

//grabs sibbling then pass to modal

const deletePost = async (ev) => {
    ev.preventDefault();

    const postId = ev.target.getAttribute("data-userId");

    const response = await fetch('api/posts/delete', {
        method: 'DELETE',
        body: JSON.stringify({
            id: postId
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/profile')
    } else { alert('Error deleting post!') }

}




const updatePost = async (ev) => {
    ev.preventDefault();

    const postId = ev.target.getAttribute('data-userid"')
    const editTitle = document.querySelector('.updatePostTitle').value;
    const editBody = document.querySelector('.updatePostBody').value;

    console.log(postId);
    console.log(editTitle);
    console.log(editBody);

    const response = await fetch("api/posts/"+postId, {
        method: 'PUT',
        body: JSON.stringify({
            post_title: editTitle,
            post_body: editBody,
            where: postId,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    console.log(postId);

    if (response.ok) {
        document.location.replace('/profile')
    } else { alert('Error editing post!') }

}

document.querySelectorAll('.editBtn').forEach((btn)=>{
    btn.addEventListener('click', (ev)=>{
       const userId = ev.target.dataset.userid;
       const saveBtn = document.querySelector('#exampleModal .save-changes');
       saveBtn.dataset.userid = userId;
    })
})


const openModal = (ev) => {
    ev.preventDefault();

    const postId = ev.target.getAttribute('data-userId')
    const postTitle = ev.target.getAttribute('data-postTitle');
    const postBody = ev.target.getAttribute('data-postBody')

    updateTitle.value = postTitle;
    updateBody.value = postBody;


    console.log(postTitle);
    console.log(postBody);
    console.log(postId);

}

document.getElementById('post-form').addEventListener('submit', addpost);
document.querySelector('.deleteBtn').addEventListener('click', deletePost);
const makeChanges = document.querySelectorAll('.editBtn')
for (let index = 0; index < makeChanges.length; index++) {
    const element = makeChanges[index];
    element.addEventListener('click', openModal);
}
document.querySelector('.save-changes').addEventListener('click', updatePost);