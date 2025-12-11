# Restaurant Webapp

## Idea and target audience

The application is an open source full stack takeout food order management system. Due to the open source nature users 
can modify the application for their own needs.

The application is made for starting restaurants who want to offer takeout option for their customers without paying
the fees of third party platforms such as Wolt or Foodora. 

## Features

### User

Users can login and register an account. 

Users can change options on products before adding them to order. Users can make orders.

Users can add products to cart and return later to complete the order.

Users can see their own order history.

### Admin

Admins can create, delete and modify products.

Admins can manage orders.

Admins can view made orders.

## Database schema

```mermaid
erDiagram
    USER {
        int user_id PK
        string type
        string username
        string password
        string email
        string phone_number
        string address
    }

    ORDER {
        int order_number PK
        string delivery_address
        float price
        long timestamp
        int user_id FK
    }

    ORDERED_FOOD {
        int order_number FK
        int product_id FK
    }

    PRODUCT {
        int product_id PK
        string name
        float price
        string description
        string image_url
        string category
        string allergen
        boolean default
    }

    PRODUCT_OPTION {
        int product_id FK
        int option_id FK
    }

    OPTION {
        int option_id PK
        string name
        string description
    }

    ALLERGEN {
        int id PK
        string name
        string icon_url
    }

    PRODUCT_ALLERGEN {
        int product_id PK
        int allergen_id PK
    }

    USER ||--o{ ORDER : "user_id => user_id"
    ORDER ||--o{ ORDERED_FOOD : "order_number => order_number"
    PRODUCT ||--o{ ORDERED_FOOD : "product_id => product_id"
    PRODUCT ||--o{ PRODUCT_OPTION : "product_id => product_id"
    OPTION ||--o{ PRODUCT_OPTION : "option_id => option_id"
    PRODUCT ||--o{ PRODUCT_ALLERGEN : "product_id → product_id"
    ALLERGEN ||--o{ PRODUCT_ALLERGEN : "allergen_id → allergen_id"
```

## UI Wireframe mockup

<img width="5712" height="2947" alt="image" src="https://github.com/user-attachments/assets/40d4b794-d718-408c-bf11-db52f443b5db" />

## Deployment

API is deployed in https://test.onesnzeroes.dev **NOW AVAILABLE IN METROPOLIA NETWORK**

Instructions for deployment below

Source [`init-db.sql`](https://github.com/leevilaune/WebProject/blob/main/sql-scripts/init-db.sql)

Run `npm install`

Run `npm run start`

Optional:

Source [`insert-mock-data.sql`](https://github.com/leevilaune/WebProject/blob/main/sql-scripts/insert-mock-data.sql)

For mock data
