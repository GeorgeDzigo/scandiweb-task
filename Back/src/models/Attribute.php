<?php

namespace App\Models;

class Attribute extends BaseAttribute
{
    protected $table = 'attributes';

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
