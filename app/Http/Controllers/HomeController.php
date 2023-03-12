<?php

namespace App\Http\Controllers;

use App\Models\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = auth()->user();
        $connections = User::whereHas('receivedRequests', function ($query) use ($user) {
            $query->where('sender_id', $user->id);
        })
            ->orWhereHas('sentRequests', function ($query) use ($user) {
                $query->where('receiver_id', $user->id);
            })->pluck('id')->toArray();

        $suggestionsCount = User::whereNotIn('id', $connections)
            ->where('id', '<>', $user->id)
            ->count();

        $sentRequestsCount = $user->sentRequests()->count();
        $receivedRequestsCount = $user->receivedRequests()->count();
        $connectionCount = $user->connections()->count();
        return view('home', compact('suggestionsCount', 'sentRequestsCount', 'receivedRequestsCount', 'connectionCount'));
    }
}
