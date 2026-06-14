@extends('layouts.app')

@section('content')
<h2>Manipulation de matrices (JS)</h2>
<div style="margin-bottom: 20px;">
    <label>Dimensions Matrice A: </label>
    <input type="number" id="rowsA" value="2" style="width: 50px;"> x <input type="number" id="colsA" value="2" style="width: 50px;">
    <br><br>
    <label>Dimensions Matrice B: </label>
    <input type="number" id="rowsB" value="2" style="width: 50px;"> x <input type="number" id="colsB" value="2" style="width: 50px;">
    <br><br>
    <button onclick="generateMatrices()">Générer Aléatoirement</button>
</div>

<div style="display: flex; gap: 50px;">
    <div>
        <h3>Matrice A</h3>
        <div id="matrixA"></div>
    </div>
    <div>
        <h3>Matrice B</h3>
        <div id="matrixB"></div>
    </div>
</div>

<div style="margin-top: 20px;">
    <button onclick="calculateSum()">Calculer Somme (A+B)</button>
    <button onclick="calculateProduct()">Calculer Produit (AxB)</button>
</div>

<div style="margin-top: 20px;">
    <h3>Résultat</h3>
    <div id="result"></div>
</div>

<script>
    function generateMatrices() {
        const rowsA = document.getElementById('rowsA').value;
        const colsA = document.getElementById('colsA').value;
        const rowsB = document.getElementById('rowsB').value;
        const colsB = document.getElementById('colsB').value;

        renderMatrix('matrixA', rowsA, colsA, true);
        renderMatrix('matrixB', rowsB, colsB, true);
    }

    function renderMatrix(id, rows, cols, random = false) {
        let html = '<table style="width: auto;">';
        for (let i = 0; i < rows; i++) {
            html += '<tr>';
            for (let j = 0; j < cols; j++) {
                const val = random ? Math.floor(Math.random() * 10) : 0;
                html += `<td><input type="number" value="${val}" class="${id}-cell" style="width: 40px;"></td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        document.getElementById(id).innerHTML = html;
    }

    function getMatrixValues(id, rows, cols) {
        const inputs = document.getElementsByClassName(`${id}-cell`);
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = parseInt(inputs[i * cols + j].value);
            }
        }
        return matrix;
    }

    function calculateSum() {
        const rA = parseInt(document.getElementById('rowsA').value);
        const cA = parseInt(document.getElementById('colsA').value);
        const rB = parseInt(document.getElementById('rowsB').value);
        const cB = parseInt(document.getElementById('colsB').value);

        if (rA !== rB || cA !== cB) {
            alert("Les dimensions doivent être identiques pour la somme !");
            return;
        }

        const A = getMatrixValues('matrixA', rA, cA);
        const B = getMatrixValues('matrixB', rB, cB);
        const C = [];

        let html = '<table style="width: auto;">';
        for (let i = 0; i < rA; i++) {
            html += '<tr>';
            for (let j = 0; j < cA; j++) {
                const sum = A[i][j] + B[i][j];
                html += `<td style="padding: 10px; border: 1px solid #ccc;">${sum}</td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        document.getElementById('result').innerHTML = html;
    }

    function calculateProduct() {
        const rA = parseInt(document.getElementById('rowsA').value);
        const cA = parseInt(document.getElementById('colsA').value);
        const rB = parseInt(document.getElementById('rowsB').value);
        const cB = parseInt(document.getElementById('colsB').value);

        if (cA !== rB) {
            alert("Le nombre de colonnes de A doit égaler le nombre de lignes de B !");
            return;
        }

        const A = getMatrixValues('matrixA', rA, cA);
        const B = getMatrixValues('matrixB', rB, cB);
        
        let html = '<table style="width: auto;">';
        for (let i = 0; i < rA; i++) {
            html += '<tr>';
            for (let j = 0; j < cB; j++) {
                let sum = 0;
                for (let k = 0; k < cA; k++) {
                    sum += A[i][k] * B[k][j];
                }
                html += `<td style="padding: 10px; border: 1px solid #ccc;">${sum}</td>`;
            }
            html += '</tr>';
        }
        html += '</table>';
        document.getElementById('result').innerHTML = html;
    }
    
    // Initial generation
    window.onload = generateMatrices;
</script>
@endsection
