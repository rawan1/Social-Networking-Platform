<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table) {

            $table->bigInteger('post_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();

            $table->foreign('post_id')
                    ->references('id')->on('posts')->onCascade('delete');

            $table->foreign('user_id')
                    ->references('id')->on('users')->onCascade('delete');
            
            $table->primary(['post_id', 'user_id']);
            $table->index('post_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('likes');
    }
}
