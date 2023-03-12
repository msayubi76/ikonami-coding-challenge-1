<?php

use App\Http\Controllers\ConnectionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->name('connections.')->group(function () {
    Route::get('suggestions', [ConnectionController::class, 'index'])->name('index');
    
    Route::post('connect/{user}', [ConnectionController::class, 'store'])->name('store');

    Route::get('requests/{mode}', [ConnectionController::class, 'showRequests'])->name('showRequests');
    Route::post('requests/{request}', [ConnectionController::class, 'update'])->name('requests.update');
    Route::delete('requests/{request}', [ConnectionController::class, 'destroy'])->name('requests.destroy');
    Route::get('connections', [ConnectionController::class, 'showConnections'])->name('connections');
    Route::delete('connection/{user}', [ConnectionController::class, 'removeConnection'])->name('removeConnection');
});