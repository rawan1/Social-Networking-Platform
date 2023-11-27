<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class postsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Post::insert([
            ['title' => 'test1', 'description' => '', 'tags' => '', 'fileUrl' => '', 'user_id' => 1 ],
            ['title' => 'test2', 'description' => '', 'tags' => '','fileUrl' => '', 'user_id' => 1],
            ['title' => 'test3', 'description' => '', 'tags' => '','fileUrl' => '', 'user_id' => 1],
        ]);
    }
}
