<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Order Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 0;">

<!-- Container -->
<div style="
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
">

    <!-- Header -->
    <div style="
        background-color: #4CAF50;
        color: white;
        padding: 30px 20px;
        text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Thank You for Your Order!</h1>
    </div>

    <!-- Content -->
    <div style="padding: 30px 20px; color: #333333;">

        <p>Hello {{ $order->user->name ?? 'Customer' }},</p>
        <p>Your order has been successfully placed. We are preparing it with love!</p>

        <!-- Order Details -->
        <div style="
            margin-top: 20px;
            background-color: #f1f1f1;
            padding: 15px;
            border-radius: 8px;">
            <strong>Order ID:</strong> {{ $order->id }}<br />
            <strong>Total Amount:</strong> ${{ number_format($order->total_price, 2) }}<br />
            <strong>Date:</strong> {{ now()->format('M d, Y') }}
        </div>

        <!-- Shipping Address -->

            <div style="
                margin-top: 20px;
                background-color: #f1f1f1;
                padding: 15px;
                border-radius: 8px;">
                <strong>Shipping Address:</strong><br/>
                Name: {{ $shippingAddress->user->name ??''}}<br/>
               email: {{ $shippingAddress->user->email ??'' }}<br/>

              Mobile no. :   {{ $shippingAddress->phone ??'' }} <br/>
               Alternative Mobile No. :  {{ $shippingAddress->alternative_phone  ??''}}<br/>

               Address: {{ $shippingAddress->province ?? '' }},{{ $shippingAddress->district ?? '' }},{{ $shippingAddress->city ?? '' }}<br>
             Municipality:   {{ $shippingAddress->full_address ?? '' }}<br/>
             Postal Code :   {{ $shippingAddress->postal_code ?? '' }}<br/>
             Nearest Landmark :   {{ $shippingAddress->nearest_landmarks ?? '' }}
            </div>


        <!-- Items Table -->
        <div style="
            margin-top: 20px;
            background-color: #f1f1f1;
            padding: 15px;
            border-radius: 8px;">

            <strong>Items Purchased:</strong>

            <!-- Scrollable wrapper for small screens -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; background-color: #fff; margin-top: 10px;">
                    <thead>
                        <tr>
                            <th style="padding: 10px; border-bottom: 1px solid #eee; text-align: left;">Image</th>
                            <th style="padding: 10px; border-bottom: 1px solid #eee; text-align: left;">Product</th>
                            <th style="padding: 10px; border-bottom: 1px solid #eee; text-align: left;">Qty</th>
                            <th style="padding: 10px; border-bottom: 1px solid #eee; text-align: left;">Price</th>
                            <th style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderItems as $item)
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                    <img  src="{{ $item->product->getImagesForOptions($item->variation_type_option_ids) }}"
                                         alt="Product Image"
                                         style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;" />
                                </td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ $item->product->title }}</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">{{ $item->quantity }}</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">${{ number_format($item->price, 2) }}</td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${{ number_format($item->price * $item->quantity, 2) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Message -->
        <p style="margin-top: 20px;">If you have any questions, feel free to contact us.</p>

        <!-- Button -->
        <a href="" style="
            display: inline-block;
            margin-top: 20px;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;">
            View Your Order
        </a>
    </div>

    <!-- Footer -->
    <div style="
        text-align: center;
        font-size: 12px;
        color: #aaa;
        padding: 20px;
        background-color: #f1f1f1;">
        &copy; {{ date('Y') }} Your Store Name. All rights reserved.
    </div>

</div>

</body>
</html>