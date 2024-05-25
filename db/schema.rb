# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_22_171046) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "autonomas", force: :cascade do |t|
    t.json "geomJson"
    t.json "fields"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "territorial_id"
  end

  create_table "layers", force: :cascade do |t|
    t.string "name"
    t.string "layer"
    t.boolean "show_legend"
    t.string "type"
    t.string "source"
    t.integer "srid"
    t.boolean "display"
    t.string "primitive"
    t.string "imagery"
    t.integer "style_id"
    t.integer "ordem"
    t.bigint "map_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["map_id"], name: "index_layers_on_map_id"
  end

  create_table "maps", force: :cascade do |t|
    t.string "target"
    t.integer "maxZoom"
    t.integer "minZoom"
    t.integer "initialZoom"
    t.string "srid"
    t.boolean "public"
    t.float "longitude"
    t.float "latitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "modulos", force: :cascade do |t|
    t.string "nome"
    t.string "url"
    t.boolean "ativo"
    t.integer "ordem"
    t.string "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "styles", force: :cascade do |t|
    t.float "opacity"
    t.integer "fill_id"
    t.integer "stroke_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "territorials", force: :cascade do |t|
    t.json "geomJson"
    t.json "fields"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ind_fiscal", limit: 255
    t.string "unidade", limit: 21
    t.string "cpf_cnpj", limit: 21
    t.string "url_autonoma", limit: 500
    t.string "nome_prop", limit: 150
    t.string "email", limit: 100
    t.string "telefone", limit: 20
    t.string "quadra", limit: 10
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "layers", "maps"
  add_foreign_key "posts", "users"
end
