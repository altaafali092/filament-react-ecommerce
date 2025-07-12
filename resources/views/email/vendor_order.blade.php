<!DOCTYPE html>
<html>
<head>
    <title>New Order Received</title>
</head>
<body>
    <h1>New Order #{{ $order->id }}</h1>

    <p>
        A new order has been received from
        {{ optional($order->user)->name ?? 'Customer' }}.
    </p>

    <p>
        Store: {{ optional($order->vendor)->store_name ?? 'Unknown Store' }}
    </p>

    <p>Total Amount: ₹{{ number_format($order->total_price, 2) }}</p>
    <p>Please process it as soon as possible.</p>
</body>
</html>
