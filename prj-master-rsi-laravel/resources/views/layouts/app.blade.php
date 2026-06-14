<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master RSI - Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f0f4f8;
        }
        header {
            background-color: #A1B9D5;
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid #7a9cb3;
        }
        footer {
            background-color: #A1B9D5;
            padding: 10px;
            text-align: center;
            border-top: 2px solid #7a9cb3;
            margin-top: auto;
        }
        .container {
            display: flex;
            flex: 1;
        }
        .sidebar {
            width: 200px;
            background-color: #e1e9f1;
            padding: 20px;
            border-right: 1px solid #ccc;
        }
        .content {
            flex: 1;
            padding: 20px;
            background-color: white;
        }
        nav ul {
            list-style: none;
            padding: 0;
        }
        nav ul li {
            margin-bottom: 10px;
        }
        nav ul li a {
            text-decoration: none;
            color: #333;
            font-weight: bold;
        }
        .alert {
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid transparent;
            border-radius: 4px;
        }
        .alert-success {
            color: #3c763d;
            background-color: #dff0d8;
            border-color: #d6e9c6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <header>
        <h1>Master RSI - Développement Web</h1>
    </header>

    <div class="container">
        @auth
        <div class="sidebar">
            <nav>
                <ul>
                    <li><a href="{{ route('about') }}">About me</a></li>
                    <li><a href="{{ route('projects') }}">Mes projets</a></li>
                    <li><a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Déconnexion</a></li>
                </ul>
            </nav>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </div>
        @endauth

        <div class="content">
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            @yield('content')
        </div>
    </div>

    <footer>
        <p>Master RSI / Année 2026</p>
    </footer>
</body>
</html>
