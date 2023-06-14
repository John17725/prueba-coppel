<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PaisesSeeder::class,
            EstadosSeeder::class,
            EmpresasSeeder::class,
            UsuarioSeeder::class
        ]);
    }
}
