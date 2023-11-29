<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterUserRequest;

class AuthenticationController extends Controller
{
    public function userLogin() {
        if(auth() -> attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = User::find(Auth::user() -> id);
            $user_token= $user -> createToken('appToken') -> accessToken;

            return $this->successResponse([
                'token' => $user_token,
                'name' => $user->name,
            ]);
        }else {
            return  $this->errorResponse(401, 'Failed to login');
        }
    }
    public function userLogout() {
        if(Auth::user()) {
            $request -> user() -> token() -> revoke();
            return $this->successResponse(null, 'Logged out successfully');
        }else {
            return  $this->errorResponse(400, 'Failed to logging out');
        }
    }
    /**
     * param RegisterUserRequest $request
     * This endpoint is for registering new user
     */
    public function userRegisteration(RegisterUserRequest $request) {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        return $this->successResponse([], 'Registered successfully', 200);
    }
    
}
