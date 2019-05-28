<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- Styles -->
        <link href="{{ asset('css/fontawesome-all.min.css') }}" rel="stylesheet" media="all">

    </head>
    <body>
        <div id="root"></div>
        <script type="text/javascript" src="{{ asset('js/adapter.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/face-api.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>

    </body>
</html>
