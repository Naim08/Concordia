class StaticPagesController < ActionController::Base
  def frontend_index
    render file: Rails.root.join('frontend/public', 'index.html')
  end
end
