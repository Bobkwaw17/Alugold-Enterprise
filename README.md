# ALUGOLD ENTERPRISE — API Endpoints

## Services
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/services` |
| `GET` | `/api/services/:id` |

## Bookings
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/bookings` |
| `GET` | `/api/bookings` |
| `GET` | `/api/bookings/:id` |
| `GET` | `/api/bookings/slots?date=YYYY-MM-DD` |
| `PATCH` | `/api/bookings/:id` |
| `DELETE` | `/api/bookings/:id` |

**POST body:** `{ service, date, timeSlot, fullName, email, projectDescription }`

## Quotes
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/quotes` |

**POST body:** `{ fullName, email, phone, serviceType, projectDescription }`

## Newsletter
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/newsletter/subscribe` |
| `DELETE` | `/api/newsletter/unsubscribe` |

**body:** `{ email }`

## Auth (Admin only)
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/auth/login` |
| `POST` | `/api/auth/logout` |

**POST /login body:** `{ email, password }`

## Projects (Admin)
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/projects` |
| `GET` | `/api/projects/:id` |
| `POST` | `/api/projects` |
| `PATCH` | `/api/projects/:id` |

**POST body:** `{ name, serviceType, description }`

## User Preferences
| Method | Endpoint |
|--------|----------|
| `GET` | `/api/users/:id/preferences` |
| `PUT` | `/api/users/:id/preferences` |

## Contact
| Method | Endpoint |
|--------|----------|
| `POST` | `/api/contact` |

**POST body:** `{ fullName, email, message }`
