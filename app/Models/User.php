<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

   

    public function sentRequests(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'connection_requests', 'sender_id', 'receiver_id')
            ->withPivot('accepted_at', 'id');
    }

    public function receivedRequests(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'connection_requests', 'receiver_id', 'sender_id')
            ->withPivot('accepted_at', 'id');
    }

    public static function connections()
    {
        return User::whereHas('receivedRequests', function ($query) {
            $query->where('sender_id', auth()->id())->where('accepted_at', '!=', null);
        })
            ->orWhereHas('sentRequests', function ($query) {
                $query->where('receiver_id', auth()->id())->where('accepted_at', '!=', null);
            });
    }

}
