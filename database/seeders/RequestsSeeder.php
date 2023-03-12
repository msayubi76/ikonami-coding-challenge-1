<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class RequestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            $numberOfRequests = random_int(40, 70);
            $usersToRequest = User::inRandomOrder()->take($numberOfRequests)->get();

            foreach ($usersToRequest as $otherUser) {
                if ($user->id !== $otherUser->id) {
                    $status = random_int(0, 1) === 0 ? null : now();
                    $user->sentRequests()->attach($otherUser->id, ['accepted_at' => $status]);
                }
            }
        }
    }
}
