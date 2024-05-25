class LayersController < ApplicationController
  before_action :set_layer, only: %i[ show edit update destroy ]

  # GET /layers or /layers.json
  def index
    @layers = Layer.all
  end

  # GET /layers/1 or /layers/1.json
  def show
  end

  # GET /layers/new
  def new
    @layer = Layer.new
  end

  # GET /layers/1/edit
  def edit
  end

  # POST /layers or /layers.json
  def create
    @layer = Layer.new(layer_params)

    respond_to do |format|
      if @layer.save
        format.html { redirect_to layer_url(@layer), notice: "Layer was successfully created." }
        format.json { render :show, status: :created, location: @layer }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @layer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /layers/1 or /layers/1.json
  def update
    respond_to do |format|
      if @layer.update(layer_params)
        format.html { redirect_to layer_url(@layer), notice: "Layer was successfully updated." }
        format.json { render :show, status: :ok, location: @layer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @layer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /layers/1 or /layers/1.json
  def destroy
    @layer.destroy!

    respond_to do |format|
      format.html { redirect_to layers_url, notice: "Layer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_layer
      @layer = Layer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def layer_params
      params.require(:layer).permit(:name, :layer, :show_legend, :type, :source, :srid, :display, :primitive, :imagery, :style_id, :ordem, :map_id)
    end
end
