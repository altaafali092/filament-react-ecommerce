<!DOCTYPE html>
<html>
<head>
    <title>New Order Received</title>
</head>
<body>
    <h1>New Order #{{ $order->id }}</h1>
    <p>A new order has been received from {{ $order->user->name ?? 'Customer' }}.</p>
    <p>Total Amount: {{ $order->total_price }}</p>
    <p>Please process it as soon as possible.</p>
</body>
</html>