<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';
    protected $fillable = [
        'nombre',
        'password',
    ];

    public static function createUser($user){
        $usuario = User::create([
            'nombre'          => $user['nombre'],
            'password'      => bcrypt($user['password'])
        ]);

        $accessToken = $usuario->createToken('authToken')->accessToken;
        return [
            "usuario" => $usuario,
            "access_token" => $accessToken
        ];
    }
}
