<?php

namespace App\Services;
use Illuminate\Support\Collection;
use App\Models\Post;


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
        return $Post::findOrFail($id);
    }

    public function updatePost() 
    {

    }

    public function deletePost($postId) 
    {
        Post::destroy($postId);
    }
}

?>