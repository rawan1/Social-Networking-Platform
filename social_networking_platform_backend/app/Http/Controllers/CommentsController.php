<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CommentsService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class CommentsController extends Controller
{


    /**
     * @var commentsService
     */
    private CommentsService $commentsService;


    /**
     * CommentsController constructor.
     * @param commentsService $CommentsService
     */
    public function __construct(CommentsService $commentsService)
    {
        $this->commentsService = $commentsService;
    }

    public function show_comments($postId) {
        return $this->commentsService->show_comments($postId);
    }

    public function AddComment(Request $request, $postId) {
        $validator = $this->validateComment();
        if($validator->fails()){
            return $this->errorResponse('400', $request->all());
        }
        $this->commentsService->addComment($request, $postId);
        return $this->successResponse([], 'Added successfully', 204);
    }

    public function validateComment(){
        return Validator::make(request()->all(), [
            'text' => 'required|string|min:3|max:255',
        ]);
    }



}
