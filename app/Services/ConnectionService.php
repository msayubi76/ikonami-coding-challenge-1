<?php

namespace App\Services;

use App\Models\ConnectionRequest;
use App\Models\User;

class ConnectionService
{
    public static function suggestions(User $user)
    {
        $connections = User::whereHas('receivedRequests', function ($query) use ($user) {
            $query->where('sender_id', $user->id);
        })
            ->orWhereHas('sentRequests', function ($query) use ($user) {
                $query->where('receiver_id', $user->id);
            })->pluck('id')->toArray();

        $suggestios = User::whereNotIn('id', $connections)
            ->where('id', '<>', $user->id)
            ->paginate(10);

        return $suggestios;
    }

    public static function connect(User $from, User $to)
    {
        ConnectionRequest::create(['sender_id' => $from->id, 'receiver_id' => $to->id]);
        return true;
    }

    public static function update(ConnectionRequest $request)
    {
        $request->update(['accepted_at' => now()]);
        return $request;
    }

    public static function destroy(ConnectionRequest $request)
    {
        $request->delete();
        return $request;
    }

    public static function connections(User $user)
    {
        return $user->connections()
            ->withCount([
                'receivedRequests as common_connections_count' => function ($query) {
                    $query->where('accepted_at', '!=', null)
                        ->whereIn('sender_id', function ($query) {
                            $query->select('receiver_id')
                                ->from('connection_requests')
                                ->where('sender_id', auth()->id())
                                ->where('accepted_at', '!=', null);
                        })
                        ->orWhereIn('receiver_id', function ($query) {
                            $query->select('sender_id')
                                ->from('connection_requests')
                                ->where('receiver_id', auth()->id())
                                ->where('accepted_at', '!=', null);
                        });
                },
            ])->paginate(10);
    }

    public static function removeConnection(User $me, User $other)
    {
        return ConnectionRequest::where(function ($query) use ($me) {
            return $query->where('sender_id', $me->id)
                ->orWhere('receiver_id', $me->id);
        })
            ->where(function ($query) use ($other) {
                return $query->where('sender_id', $other->id)
                    ->orWhere('receiver_id', $other->id);
            })->whereNotNull('accepted_at')
            ->delete();
    }

}
