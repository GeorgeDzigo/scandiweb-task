<?php

namespace App\Models;

class Category extends BaseAttribute
{
    protected $table = 'categories';


    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
