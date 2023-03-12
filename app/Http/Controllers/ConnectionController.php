<?php

namespace App\Http\Controllers;

use App\Models\ConnectionRequest;
use App\Models\User;
use App\Services\ConnectionService;
use GuzzleHttp\Psr7\Request;

class ConnectionController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            $suggestions = ConnectionService::suggestions($user); 
             
            return response()->json(['status' => true, 'message' => 'Success', 'suggestions' => $suggestions ]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    public function store(User $user)
    {
        try {
            ConnectionService::connect(auth()->user(), $user);
            return response()->json(['status' => true, 'message' => 'Request sent successfully.', 'user' => $user]);
        } catch (\Throwable$th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }
    
    public function update(ConnectionRequest $request)
    {
        try {
            ConnectionService::update($request);
            return response()->json(['status' => true, 'message' => 'Request accepted successfully.']);
        } catch (\Throwable$th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    
    public function destroy(ConnectionRequest $request)
    {
        try {
            ConnectionService::destroy($request);
            return response()->json(['status' => true, 'message' => 'Request withdrawed successfully.']);
        } catch (\Throwable$th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }


    public function showRequests(string $mode)
    {
        try {
            $user = auth()->user();
            if ($mode == 'sent'):
                $requests = $user->sentRequests();
            else:
                $requests = $user->receivedRequests();
            endif;
            $requests = $requests->wherePivotNull('accepted_at')->paginate(10);
            return response()->json(['status' => true, 'message' => 'Success', 'requests' => $requests]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }
 

    
    public function showConnections()
    {
        try {
            $user = auth()->user();
            $connections = ConnectionService::connections($user);
            return response()->json(['status' => true, 'message' => 'Success', 'connections' => $connections]);
        } catch (\Throwable $th) { dd($th);
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }
    
    
    public function removeConnection(User $user)
    {
        try { 
            ConnectionService::removeConnection(auth()->user(), $user);
            return response()->json(['status' => true, 'message' => 'Connection remvoed successfully.']);
        } catch (\Throwable $th) { dd($th);
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        }
    }

    

}
