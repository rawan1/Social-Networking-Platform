<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'created_at',
        'updated_at',
        'file_url',

    ];

    public function user() {
        return $this->belongsTo(User::class)->select('name', 'id');
    }
    public function comments() {
        return $this->hasMany(Comment::class);
    }
}
