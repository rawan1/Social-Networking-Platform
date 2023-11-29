<?php

namespace App\Http\Controllers;

use App\Models\post;
use App\Models\User;
use App\Services\PostsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Jobs\SendEmailJob;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{

    /**
     * @var PostsService
     */
    private PostsService $postsService;


    /**
     * PostController constructor.
     * @param PostsService $PostsService
     */
    public function __construct(PostsService $postsService)
    {
        $this->postsService = $postsService;
    }


    /**
     * Display a listing of the posts.
     ** @param  PostRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllPosts(PostRequest $request): JsonResponse
    {
        $posts = $this->postsService->getAll(max($request->input('limit'), 10));
        return $this->successResponse($posts);
    }


    /**
     * save new post in the db
     */
    public function storePost(PostRequest $request) 
    {   
        $postData = $request->all();
        $this->postsService->createPost($request, $request->user());

        $users = User::where('id', '<>', 1)->get();
        foreach($users as $user){
            SendEmailJob::dispatch($user)
            ->delay(now()->addMinutes(60));
        }
        return $this->successResponse([], 'Created successfully', 200);
    }


    /**
     * Display the specified post.
     *
     * @param    $postIs
     * @return \Illuminate\Http\JsonResponse
     */
    public function getById(int $postId)
    {
        try {
            $post = $this->postsService->getPostById($postId);
            return $this->successResponse($post);
        } catch (Exception $e) {
            return $this->errorResponse($e->getStatus(), $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Requests\PostRequest  $request
     * @param    $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePost(PostRequest $request, int $postId)
    {
        $this->postsService->updatePost($request);
        return $this->successResponse([], 'Created successfully', 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param   $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deletePost(int $postId)
    {
        try {
            $this->postsService->deletePost($postId);
            return $this->successResponse([], 'Deleted successfully', 204);
        } catch (Exception $e) {
            return $this->errorResponse($e->getStatus(), $e->getMessage());
        }
    }
    /**
     * @param   $searchTerm
     * @return \Illuminate\Http\JsonResponse
     * this will return a list of posts that satisfied the search term
     */
    public function searchPost(string $searchTerm)
    {
        $posts = $this->postsService->searchPosts($searchTerm);
        return $this->successResponse($posts);
    }

}
