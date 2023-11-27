<?php

namespace App\Http\Controllers;

use App\Models\post;
use App\Services\PostsService;
use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;

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
     ** @param  Requst  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllPosts(Request $request): JsonResponse
    {
        $posts = $this->postsService->getAll(max($request->input('limit'), 10));
        return $this->successResponse($posts);
    }

    /**
     * Show the form for creating a new post.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function create()
    {
        //
    }


    /**
     * Display the specified post.
     *
     * @param    $postIs
     * @return \Illuminate\Http\JsonResponse
     */
    public function getById($postId)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param   $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($postId)
    {
        try {
            $this->postsService->deletePost($id);
            return response()->json([], 204);
            return $this->successResponse([], 'Deleted successfully', 204);
        } catch (Exception $e) {
            return $this->errorResponse($e->getStatus(), $e->getMessage());
        }
    }
}
