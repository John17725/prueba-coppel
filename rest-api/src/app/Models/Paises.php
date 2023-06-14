<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paises extends Model
{
    use HasFactory;
    protected $table = 'paises';
    protected $fillable = [
        'id',
        'name'
    ];

    public static function getPaises(){
        return Paises::all();
    }

}
