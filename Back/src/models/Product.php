<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    public $incrementing = false;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function attributes()
    {
        return $this->hasMany(Attribute::class);
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }
}
