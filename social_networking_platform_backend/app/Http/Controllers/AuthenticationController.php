<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthenticationController extends Controller
{
    public function userLogin() {
        if(auth() -> attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = User::find(Auth::user() -> id);
            $user_token['token'] = $user -> createToken('appToken') -> accessToken;

            return $this->successResponse([
                'token' => $user_token,
                'user' => $user,
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
}
