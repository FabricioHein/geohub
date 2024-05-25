class TerritorialsController < ApplicationController
  before_action :set_territorial, only: %i[ show edit update destroy ]

  # GET /territorials or /territorials.json
  def index
    @territorials = Territorial.limit(200)

  end

  # GET /territorials/1 or /territorials/1.json
  def show
  end

  # GET /territorials/new
  def new
    @territorial = Territorial.new
  end

  # GET /territorials/1/edit
  def edit
  end

  # POST /territorials or /territorials.json
  def create
    @territorial = Territorial.new(territorial_params)

    respond_to do |format|
      if @territorial.save
        format.html { redirect_to territorial_url(@territorial), notice: "Territorial was successfully created." }
        format.json { render :show, status: :created, location: @territorial }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @territorial.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /territorials/1 or /territorials/1.json
  def update
    respond_to do |format|
      if @territorial.update(territorial_params)
        format.html { redirect_to territorial_url(@territorial), notice: "Territorial was successfully updated." }
        format.json { render :show, status: :ok, location: @territorial }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @territorial.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /territorials/1 or /territorials/1.json
  def destroy
    @territorial.destroy!

    respond_to do |format|
      format.html { redirect_to territorials_url, notice: "Territorial was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_territorial
      @territorial = Territorial.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def territorial_params
      params.require(:territorial).permit(:geomJson, :fields)
    end
end
