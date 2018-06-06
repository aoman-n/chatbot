class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

   def created_time
     created_at.strftime("%Y-%m-%dT%H:%M:%S")
   end
end
