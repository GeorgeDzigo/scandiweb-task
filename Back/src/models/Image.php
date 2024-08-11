<?php
namespace App\Models;

class Image extends BaseAttribute
{
    protected $table = 'images';


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
