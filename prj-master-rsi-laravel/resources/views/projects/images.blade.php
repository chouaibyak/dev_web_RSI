@extends('layouts.app')

@section('content')
<h2>Gestion d'images (DB BLOB)</h2>

<div style="margin-bottom: 30px; padding: 20px; border: 1px solid #ccc;">
    <h3>Uploader une image</h3>
    <form action="{{ route('images') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="image" required>
        <button type="submit">Uploader</button>
    </form>
</div>

<h3>Galerie</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
    @foreach($images as $img)
    <div style="border: 1px solid #ccc; padding: 5px; text-align: center;">
        <img src="{{ route('images.show', $img->id) }}" style="width: 100%; height: 100px; object-fit: cover;" alt="{{ $img->name }}">
        <p style="font-size: 10px; margin: 5px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ $img->name }}</p>
    </div>
    @endforeach
</div>
@endsection
