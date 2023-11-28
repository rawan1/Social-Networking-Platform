<?php

namespace App\Services;
use Illuminate\Support\Collection;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;


class PostsService
{

    /**
     * @param array $columns
     * @param array $with
     */
    public function getAll($limit)
    {
        $posts = Post::select(['title', 'description', 'fileUrl', 'tags']);

        return $posts->paginate($limit)->items();
    }

    public function getPostById($id)
    {
        return Post::find($id);
    }

    public function updatePost($postData) 
    {
        $post = Post::find($postData->get('id'));
        if ($post->exists()) {
            $post->title = $postData->get('title');
            $post->description = $postData->get('description');
            $post->tags = $postData->get('tags');
            $post->updated_at = now();
    
            if ($postData->hasFile('image'))
            {
                  $file      = $postData->file('image');
                  $extension = $file->getClientOriginalExtension();
                  $filename  = $post->title . '_' . strval($post->id) . '.' . $extension;
                  Storage::delete($post->fileUrl);

                  $image_path = $postData->file('image')->storeAs('images',  $filename,'public');
                  $post->fileUrl = $image_path;
            }
            $post->save();

        } else {
            return;
        } 
    }

    public function deletePost($postId) 
    {
        Post::destroy($postId);
    }
    public function createPost($postData, $user)
    {
        $post = Post::create([
            'title' => $postData->get('title'),
            'description' => $postData->get('description'),
            'tags' => $postData->get('tags'),
            'user_id' => 1,
            'creation_date' => now(),
        ]);

        if ($postData->hasFile('image'))
        {
              $file      = $postData->file('image');
              $extension = $file->getClientOriginalExtension();
              $filename  = $post->title . '_' . strval($post->id) . '.' . $extension;
              $image_path = $postData->file('image')->storeAs('images',  $filename,'public');
              $post->fileUrl = $image_path;
              $post->save();
        }
    }
    public function searchPosts($searchTerm) 
    {

    }
}

?>