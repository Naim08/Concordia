json.title "Server Error"
json.error @message
json.stack @stack unless Rails.env.production?
