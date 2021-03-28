This is a meme posting and display page. 

The page begins with a form with 3 fields, namely:
> Name : Name of original poster. This field is required.
> Caption : A caption that goes with the meme. This field is not required.
> Link : URL of the image to be retrieved. This field is required.

Once submitted, the post will show up on top with its associated information. Other memes follow, one after the other, in reverse order of their creation time.
The limit is set to 100 posts, so latest 100 memes will show up on page.

The displayed image will in itself be a link to it's original URL.

Below is each post there are two buttons:
> Edit : This will take user to a page with a pre-filled form that user can edit along with a preview of the meme that is currently posted before any edit is made.
> Delete : This will delete the post entirely

A post request to '/memes' will return object Id of the post created.
At '/memes' one can see a json response with details of all posts made.
At '/memes/:id' information of particular post will be shown.
In case the Id is invalid, 404 status code is returned. 