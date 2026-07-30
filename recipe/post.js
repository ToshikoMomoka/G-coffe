document.getElementById('publish-button').addEventListener('click', function () {
    const postTitle = document.getElementById('post-title').value.trim();
    const postContent = document.getElementById('post-content').value.trim();
    const fileInput = document.getElementById('upload-image');
    const files = fileInput.files;

    // Reset any existing alerts
    document.getElementById('alert-container').innerHTML = '';

    // Title and content validation
    if (!postTitle || postTitle.length < 3 || postTitle.length > 20) {
        showAlert('Title must be between 3 and 20 characters long.', 'danger');
        return;
    }

    if (!postContent || postContent.length === 0) {
        showAlert('Post content cannot be empty!', 'danger');
        return;
    }

    if (!files.length) {
        showAlert('You must upload an image to post!', 'danger');
        return;
    }

    let imageUrl = '';
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const aspectRatio = img.width / img.height;
            const targetWidth = 300;
            const targetHeight = 200;

            if (aspectRatio > 1) {
                canvas.width = targetWidth;
                canvas.height = targetWidth / aspectRatio;
            } else {
                canvas.height = targetHeight;
                canvas.width = targetHeight * aspectRatio;
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            imageUrl = canvas.toDataURL();
            createPost(postTitle, postContent, imageUrl);
        };
    };
    reader.readAsDataURL(files[0]);

    // Clear form inputs
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    fileInput.value = '';
});

function showAlert(message, type) {
    const alert = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.getElementById('alert-container').insertAdjacentHTML('beforeend', alert);
}

function createPost(title, content, imageUrl) {
    const postId = 'post-' + Date.now();
    let newPost = `
        <div class="post-box">
            <button class="btn btn-secondary w-100" type="button" data-bs-toggle="collapse" data-bs-target="#${postId}" aria-expanded="false" aria-controls="${postId}">
                ${title}
            </button>
            <div class="collapse mt-2" id="${postId}">
                <div class="card card-body">
                    <p>${content}</p>
    `;
    if (imageUrl) {
        newPost += `<img src="${imageUrl}" class="post-img" alt="Uploaded Image">`;
    }
    newPost += `
                </div>
            </div>
        </div>
    `;
    document.getElementById('posts-container').insertAdjacentHTML('beforeend', newPost);
}
