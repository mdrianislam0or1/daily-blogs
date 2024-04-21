<?php

namespace App\Http\Controllers;

use App\Models\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|unique:logins',
            'password' => 'required|string|min:8',
        ]);
    
        $newUser = Login::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        return response()->json([
            'status' => true,
            'message' => 'User registered successfully.',
            'data' => $newUser
        ], 201);
    }
    

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $login = Login::where('email', $request->email)->first();

        if (!$login || !Hash::check($request->password, $login->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $login->createToken('authToken')->plainTextToken;

        return response()->json([
            'status' => true,
            'token' => $token,
            'email' => $login->email,
        ]);
    }
}
