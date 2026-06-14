<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login' => ['required'],
            'pass' => ['required'],
        ]);

        $user = \App\Models\Etudiant::where('login', $credentials['login'])->first();

        if ($user && ($user->pass === $credentials['pass'] || \Illuminate\Support\Facades\Hash::check($credentials['pass'], $user->pass))) {
            Auth::login($user);
            $request->session()->regenerate();
            return redirect()->intended('projects');
        }

        return back()->withErrors([
            'login' => 'Les identifiants ne correspondent pas.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
