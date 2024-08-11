<?php
namespace App\Models;

class Price extends BaseAttribute
{
    protected $table = 'prices';

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
