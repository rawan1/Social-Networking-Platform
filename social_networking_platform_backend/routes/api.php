<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->name('authenticate')->controller(AuthenticationController::class)->group(function () {
    Route::post('login','userLogin');
    Route::post('logout','userLogout')-> middleware('auth:api');
});

Route::prefix('posts')->controller(PostController::class)->group(function () {
    Route::get('getPosts','getAllPosts');
    Route::delete('deletePost/{id}','deletePost');
    Route::get('getPost/{id}','getById');
    Route::post('createPost','storePost');
    Route::put('updatePost/{id}','updatePost');
    Route::get('searchPosts','searchPost');

});


