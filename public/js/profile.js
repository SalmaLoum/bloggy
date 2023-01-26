const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const description = document
    .querySelector('#description')
    .value.trim();
  const date = document.querySelector('#blog_name').value.trim();
 

  if (
    name &&
    description &&
    date &&
   
  ) {
    console.log(photo);
    let input = JSON.stringify({
      name,
      description,
      blog_date: date,
  
    });

    // console.log(input)
    const response = await fetch(`/api/bloggy/`, {
      method: 'POST',
      body: input,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // /profile corresponds to homeRoutes.js on BE
      document.location.replace('/profile');
    }

    //Error bars when no entry is provided by users.
  } else {
    if (!name) {
      document.querySelector('#name').className =
        'input-error form-control';
    }
 
    if (!date) {
      document.querySelector('#blog_date').className =
        'input-error form-control';
    }
  
    if (!description) {
      document.querySelector(' #description').className =
        'input-error form-control';
    }
  

    document.querySelector('.error-text').textContent =
      'You need to complete all fields to post a blog!';
  }
};
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/bloggy/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    }
  }
};

document
  .querySelector('.new-bloggy-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.bloggy-list')
  .addEventListener('click', delButtonHandler);
