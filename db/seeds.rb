# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# #   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!("users")

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  champions = [
    { name: "Ahri", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg" },
    { name: "Akali", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg" },
    { name: "Aatrox", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg" },
    { name: "Alistar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_0.jpg" },
    { name: "Amumu", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Amumu_0.jpg" },
    { name: "Anivia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Anivia_0.jpg" },
    { name: "Annie", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Annie_0.jpg" },
    { name: "Aphelios", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aphelios_0.jpg" },
    { name: "Ashe", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg" },
    { name: "Aurelion Sol", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/AurelionSol_0.jpg" },
    { name: "Azir", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg" },
    { name: "Bard", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Bard_0.jpg" },
    { name: "Blitzcrank", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_0.jpg" },
    { name: "Brand", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Brand_0.jpg" },
    { name: "Braum", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Braum_0.jpg" },
    { name: "Caitlyn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_0.jpg" },
    { name: "Camille", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Camille_0.jpg" },
    { name: "Cassiopeia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Cassiopeia_0.jpg" },
    { name: "Cho'Gath", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_0.jpg" },
    { name: "Corki", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Corki_0.jpg" },
    { name: "Darius", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg" },
    { name: "Diana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Diana_0.jpg" },
    { name: "Dr. Mundo", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/DrMundo_0.jpg" },
    { name: "Draven", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_0.jpg" },
    { name: "Ekko", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_0.jpg" },
    { name: "Elise", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Elise_0.jpg" },
    { name: "Evelynn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_0.jpg" },
    { name: "Ezreal", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ezreal_0.jpg" },
    { name: "Fiddlesticks", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiddlesticks_0.jpg" },
    { name: "Fiora", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fiora_0.jpg" },

    { name: "Fizz", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Fizz_0.jpg" },
    { name: "Galio", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_0.jpg" },
    { name: "Gangplank", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg" },
    { name: "Garen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg" },
    { name: "Gnar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gnar_0.jpg" },
    { name: "Gragas", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_0.jpg" },
    { name: "Graves", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Graves_0.jpg" },
    { name: "Gwen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gwen_0.jpg" },
    { name: "Hecarim", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Hecarim_0.jpg" },
    { name: "Heimerdinger", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Heimerdinger_0.jpg" },
    { name: "Illaoi", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Illaoi_0.jpg" },
    { name: "Irelia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Irelia_0.jpg" },
    { name: "Ivern", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ivern_0.jpg" },
    { name: "Janna", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Janna_0.jpg" },
    { name: "Jarvan IV", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_0.jpg" },
    { name: "Jax", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jax_0.jpg" },
    { name: "Jayce", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_0.jpg" },
    { name: "Jhin", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_0.jpg" },
    { name: "Jinx", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg" },
    { name: "Kai'Sa", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_0.jpg" },
    { name: "Kalista", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kalista_0.jpg" },
    { name: "Karma", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karma_0.jpg" },
    { name: "Karthus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Karthus_0.jpg" },
    { name: "Kassadin", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kassadin_0.jpg" },
    { name: "Katarina", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Katarina_0.jpg" },
    { name: "Kayle", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_0.jpg" },
    { name: "Kayn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayn_0.jpg" },
    { name: "Kennen", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kennen_0.jpg" },
    { name: "Kha'Zix", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Khazix_0.jpg" },
    { name: "Kindred", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kindred_0.jpg" },
    { name: "Kled", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kled_0.jpg" },
    { name: "Kog'Maw", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/KogMaw_0.jpg" },
    { name: "LeBlanc", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leblanc_0.jpg" },
    { name: "Lee Sin", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg" },
    { name: "Leona", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_0.jpg" },
    { name: "Lillia", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lillia_0.jpg" },
    { name: "Lissandra", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lissandra_0.jpg" },

    { name: "Lucian", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_0.jpg" },
    { name: "Lulu", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lulu_0.jpg" },
    { name: "Lux", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg" },
    { name: "Malphite", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malphite_0.jpg" },
    { name: "Malzahar", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malzahar_0.jpg" },
    { name: "Maokai", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Maokai_0.jpg" },
    { name: "Master Yi", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_0.jpg" },
    { name: "Miss Fortune", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MissFortune_0.jpg" },
    { name: "Mordekaiser", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Mordekaiser_0.jpg" },
    { name: "Morgana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_0.jpg" },
    { name: "Nami", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nami_0.jpg" },
    { name: "Nasus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nasus_0.jpg" },
    { name: "Nautilus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nautilus_0.jpg" },
    { name: "Neeko", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Neeko_0.jpg" },
    { name: "Nidalee", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nidalee_0.jpg" },
    { name: "Nocturne", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nocturne_0.jpg" },
    { name: "Nunu & Willump", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nunu_0.jpg" },
    { name: "Olaf", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Olaf_0.jpg" },
    { name: "Orianna", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Orianna_0.jpg" },
    { name: "Ornn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ornn_0.jpg" },
    { name: "Pantheon", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pantheon_0.jpg" },
    { name: "Poppy", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Poppy_0.jpg" },
    { name: "Pyke", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg" },
    { name: "Qiyana", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Qiyana_0.jpg" },
    { name: "Quinn", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Quinn_0.jpg" },
    { name: "Rakan", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rakan_0.jpg" },
    { name: "Rammus", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rammus_0.jpg" },
    { name: "Rek'Sai", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/RekSai_0.jpg" },
    { name: "Rell", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Rell_0.jpg" },
    { name: "Renekton", img_url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renekton_0.jpg" },
  ]

  champions.each do |champion|
    sanitized_name = champion[:name].downcase.gsub(/[^a-z0-9]/, "")
    email = "#{sanitized_name}@lol.com"

    # Ensure email length is within the valid range
    if email.length >= 3 && email.length <= 255
      user = User.new(
        username: champion[:name],
        email: email,
        password_digest: BCrypt::Password.create("password123"), # Placeholder password
        session_token: SecureRandom::urlsafe_base64,
        profile_picture_url: champion[:img_url],
      )

      # Attempt to save the user, and if it fails due to uniqueness, log an error
      unless user.save
        puts "Error saving user with email #{email}: #{user.errors.full_messages.join(", ")}"
      end
    else
      puts "Email #{email} is out of valid length range."
    end
  end

  puts "Done!"
end
